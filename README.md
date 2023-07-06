## Ecommerce React App
This is a frontend application for an ecommerce website built using React.js and Redux. The application interacts with a dummy ecommerce API service to fetch product data and perform CRUD operations. It includes features such as a navigation bar, product listing, product editing and deletion, sorting, adding products to the cart, viewing cart items, handling errors, and persisting cart data using Redux.

## Installation
Clone the repository:

git clone <repository-url>
Navigate to the project directory:
cd ecommerce-react-app

## Install the dependencies:

npm install

## Usage
Start the development server:
npm start

This will start the application and open it in your default browser. If the browser doesn't open automatically, you can access the app at http://localhost:3000.

Use the application to browse products, add them to the cart, and perform various operations as described in the problem statement.

Project Structure
The project structure is as follows:

public/: Contains the public assets and HTML template for the application.
src/: Contains the source code for the React application.
actions/: Defines Redux actions for managing the application state.
apiCall/: Defines api constant values used throughout the application.
components/: Contains reusable React components.
Notification/: Contains notification components that connect Redux state and actions to the corresponding presentational components used toast notification.
reducers/: Defines Redux reducers for handling application state changes.
 Contains service modules for interacting with the ecommerce API.
 Contains utility functions used in the application.
App.js: The root component of the application.
index.js: The entry point of the application.
store.js: Configures the Redux store.

## Technologies Used

React.js: A JavaScript library for building user interfaces.
Redux: A predictable state container for managing application state.
React Router: A routing library for React applications.
Axios: A promise-based HTTP client for making API requests.
Bootstrap: A popular CSS framework for styling the application.
React Bootstrap: React components that implement Bootstrap styles.
Redux Persist: A library for persisting and rehydrating Redux stores.

## Contributors
Shaik Rahimun

## License
This project is licensed under the MIT License.