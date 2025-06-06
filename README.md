# ReplyWise 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)
![Tech](https://img.shields.io/badge/tech-Spring_Boot_&_JS-orange)

ReplyWise is an intelligent browser extension that acts as your personal email assistant. It leverages the power of AI to generate concise summaries of incoming emails and craft well-written responses in various tones, streamlining your communication workflow.

---

## ✨ Features

*   **📧 Instant Email Summaries:** Quickly grasp the key points of long or complex emails without reading every word.
*   **🤖 AI-Powered Responses:** Generate thoughtful and context-aware replies in seconds.
*   **🎯 Customizable Tones:** Adapt your response to any situation by choosing from multiple tones like Professional, Friendly, Formal, and more.
*   **🔒 Privacy-Focused:** Your email content is processed to generate a response but is **never stored** on our servers.
*   **⚡️ Sleek & Simple UI:** A clean, intuitive interface designed for speed and ease of use.

---

## 🛠️ Tech Stack

This project is a full-stack application composed of a backend service and a browser extension frontend.

| Component         | Technology                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Backend**       | **Java 21**, **Spring Boot 3**, **Spring Security**, **Spring AI**, **Bucket4j** (for Rate Limiting)            |
| **Frontend**      | **Vanilla JavaScript (ES6+)**, **HTML5**, **CSS3**                                                            |
| **AI Provider**   | **OpenAI API**                                                                                              |
| **Deployment**    | The backend service is deployed on **Render**.                                                              |

---

## 📦 Installation

The extension is currently under review by Mozilla. Once approved, you will be able to install it directly from the Firefox Browser ADD-ONS store:

**[Link to Firefox Add-on Store will go here once approved]**

---

## 🔧 Development Setup

Interested in running the project locally? Here’s how to get it set up.

### Prerequisites

*   Java JDK 21
*   Apache Maven
*   An OpenAI API Key
*   Firefox Browser

### 1. Backend Setup

The backend is a standard Spring Boot application.

```bash
# Clone the repository
git clone https://github.com/your-username/ReplyWise.git
cd ReplyWise/ReplyWise_Backend

# Create your local configuration file
# Copy the example file
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Now, edit src/main/resources/application.properties and add your OpenAI API key
# openai.api.key=sk-YOUR_SECRET_OPENAI_KEY

# Build and run the application
mvn clean install
mvn spring-boot:run