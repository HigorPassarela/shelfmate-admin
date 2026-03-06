FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Use npm install instead of npm ci to resolve dependencies automatically
RUN npm install --production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Show build results
RUN echo "=== BUILD COMPLETED ===" && ls -la dist/

# Install serve
RUN npm install -g serve

# Create startup script
RUN echo '#!/bin/sh' > start.sh && \
    echo 'echo "Starting serve on port $PORT"' >> start.sh && \
    echo 'serve -s dist -l $PORT --cors --single' >> start.sh && \
    chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]