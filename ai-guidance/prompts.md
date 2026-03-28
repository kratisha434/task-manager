//AI Prompting Guidelines

This file explains how AI prompts were structured to ensure safe and correct output.

Prompting Strategy:
- Provide full context: project stack, database type, frontend/backend roles.
- Specify constraints: coding style, security rules, input validation, and simplicity.
- Request step-by-step explanations rather than full final code blocks when possible.
- Always review and verify AI suggestions before integrating.

Example Prompts Used:
1. "Generate a Flask API endpoint for creating tasks with SQLAlchemy and PostgreSQL. Validate all inputs and handle errors gracefully. Do not include any secrets."
2. "Create a React task list component with state management and proper type checking. Use simple, readable code and follow best practices."
3. "Suggest a database schema for storing users, tasks, and categories. Ensure referential integrity and normalization."

//Verification Process:
- All AI-generated code is manually reviewed.
- Unit tests are written to confirm behavior.
- Any unsafe or incorrect suggestions are rejected or modified before integration.