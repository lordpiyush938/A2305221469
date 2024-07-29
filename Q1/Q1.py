from flask import Flask, request, jsonify
import requests
from threading import Lock
import time

app = Flask(__name__)

# Window size configuration
WINDOW_SIZE = 10

# Dictionary to store numbers for each type
window_data = {
    'p': [],
    'f': [],
    'e': [],
    'r': []
}

# Lock for thread-safe operations
lock = Lock()

# Third-party API endpoints
API_ENDPOINTS = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/rand'
}

def fetch_numbers(number_type):
    try:
        start_time = time.time()
        response = requests.get(API_ENDPOINTS[number_type], timeout=0.5)
        if response.status_code == 200 and (time.time() - start_time) < 0.5:
            return response.json().get('numbers', [])
    except requests.RequestException:
        pass
    return []

@app.route('/numbers/<numberid>', methods=['GET'])
def get_numbers(numberid):
    if numberid not in API_ENDPOINTS:
        return jsonify({'error': 'Invalid number ID'}), 400

    with lock:
        prev_state = window_data[numberid].copy()
        
        new_numbers = fetch_numbers(numberid)
        for num in new_numbers:
            if num not in window_data[numberid]:
                if len(window_data[numberid]) >= WINDOW_SIZE:
                    window_data[numberid].pop(0)
                window_data[numberid].append(num)
        
        curr_state = window_data[numberid].copy()
        avg = sum(curr_state) / len(curr_state) if curr_state else 0

    response = {
        'windowPrevState': prev_state,
        'windowCurrState': curr_state,
        'numbers': new_numbers,
        'avg': round(avg, 2)
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9876)
