# Average Calculator HTTP Microservice

This repository contains an Average Calculator microservice that exposes a REST API to calculate the average of numbers based on qualified number IDs, such as prime, Fibonacci, even, and random numbers.

## Project Structure

- `average_calculator.py` - The main Python file containing the implementation of the Average Calculator HTTP Microservice.

## Features

- Accepts qualified number IDs: 'p' for prime, 'f' for Fibonacci, 'e' for even, and 'r' for random numbers.
- Fetches numbers from a third-party server and stores them uniquely.
- Calculates the average of stored numbers based on a configurable window size.
- Ensures quick responses within 500 milliseconds.
- Ignores responses taking longer than 500 milliseconds or encountering errors.

## Getting Started

### Prerequisites

- Python 3.7+ installed on your machine.
- Required Python packages listed in `requirements.txt`.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/average-calculator-microservice.git
   cd average-calculator-microservice
