from ai-engine.main import app

# Vercel serverless handler
def handler(request, response):
    return app(request, response)
