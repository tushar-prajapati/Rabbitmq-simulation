# RabbitMQ Summarization Worker

This project demonstrates how to use **RabbitMQ** with Node.js for asynchronous task processing.  
The use case here is:  
- Upload a document  
- Summarize it using **Google GenAI**  
- Send the summary to the user via **email**  

---

## 📂 Project Structure
```
.
├── index.js              # Express server entry point
├── controllers/
│   └── summarizeController.js   # Handles incoming requests, pushes jobs to RabbitMQ
├── worker/
│   └── worker.js         # Worker that consumes jobs, summarizes text, and sends email
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo & install dependencies
```bash
git clone <your-repo-url>
cd <your-project>
npm install
```

### 2. Install & Run RabbitMQ
Follow [RabbitMQ installation guide](https://www.rabbitmq.com/download.html).  
Start RabbitMQ locally:
```bash
rabbitmq-server
```

### 3. Environment Variables
Create a `.env` file in the project root:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

### 4. Run Express Server
```bash
node index.js
```
This starts your **API server**.

### 5. Run Worker
```bash
node worker/worker.js
```
This starts your **RabbitMQ consumer**.

---

## 🚀 Workflow

1. A user uploads a file via the API (`/summarize`).  
2. Controller pushes the text + email job into **RabbitMQ queue**.  
3. Worker consumes the job:  
   - Generates summary using **Google GenAI**  
   - Sends email using **Nodemailer**  
4. API responds instantly with `{ success: true, message: "File submitted for summarization." }`.  

---

## 📌 Example Response
```json
{
  "success": true,
  "message": "File submitted for summarization."
}
```

---

## 🔑 Key Notes
- The **controller** does not perform heavy tasks, only enqueues jobs.  
- The **worker** handles summarization + email sending.  
- Jobs are retried if worker fails (using `nack`).  

---

## 🛠 Future Improvements
- Add **retry limit** instead of infinite retries.  
- Store summaries in a database for future retrieval.  
- Add UI to upload files & show status.  
