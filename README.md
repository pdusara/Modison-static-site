# ModiSon Static Site

A lightweight, responsive ordering page for the ModiSon product line.  
Live demo: https://d1p4pvkzpycf8v.cloudfront.net/Views/Home/Index.html

## Features

- Fully responsive design across desktop and mobile  
- Modular CSS with custom properties for easy theming  
- Vanilla JavaScript for interactive elements (mobile menu, smooth scroll)  

## Work in Progress

This site is under active development. Planned enhancements include:

- Admin pages for inventory and order management.

## Tech Stack

- HTML5, CSS3, JavaScript (ES6+)  
- AWS CloudFront for global CDN distribution  

## CI/CD Pipeline

Configured via GitHub Actions in `.github/workflows/deploy-static.yml`:

1. **On push to `main`**  
   - Checkout code  
2. **Deploy step**  
   - Sync `wwwroot/` to S3 bucket  
   - Invalidate CloudFront distribution cache  
3. **Notifications**  
   - Email

## Backend Integration
This static site integrates with the ModiSon Serverless Backend for secure order processing, customer management, and inventory operations. The backend is built using a scalable serverless architecture on AWS, including:
- API Gateway: Public-facing RESTful API endpoints
- AWS Lambda (.NET): Business logic execution
- DynamoDB: Persistent, low-latency data storage
- Cognito: Authentication and authorization for admin features
This backend enables seamless end-to-end ordering workflows and will power future enhancements like admin dashboards and email notifications.
https://github.com/pdusara/ModiSon-Serverless-App/new/main?filename=README.md

## Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/pdusara/Modison-static-site.git
2. Change into the directory
   ```bash
   cd Modison-static-site/wwwroot
3. Open index.html in your browser or serve locally with a static server:
    ```bash
    npx serve

## Project Structure

  ```bash
  Modison-static-site/
  ├─ .github/
  │  └─ workflows/
  │     └─ deploy-static.yml
  ├─ ModiSonFrontEnd/
  │  ├─ Views/ │
  │  ├─ Home/ │
  │  │  └─ Index.html │
  │  ├─ Orders/ │
  │  │  └─ Create.html │
  │  │  └─ CustomerOrderList.html │
  │  └─ Shared/ │
  │     └─ Error.html
  │  └─ wwwroot/
  │     ├─ css/
  │     ├─ js/
  │     ├─ lib/
  │     └─ favicon.ico
  └─ README.md
