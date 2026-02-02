class PolicyChatService:
    def __init__(self):
        # In a real app, this would use a RAG system or an LLM
        self.knowledge_base = {
            "immunotherapy": "Most insurance plans cover FDA-approved immunotherapy, but prior authorization is usually required. Check your 'Summary of Benefits' under 'Specialty Medications'.",
            "appeal": "To start an appeal, you'll need the denial letter and your doctor's support. I can help you draft a letter using our ACS CAN template integration.",
            "clinical trials": "Starting in 2022, clinical trial coverage is mandated for most plans if the trial is for a life-threatening condition. We can check your state-specific rules.",
            "denial": "Common denial reasons include 'not medically necessary' or 'out of network'. Tell me more about the denial letter so I can help."
        }

    def get_reply(self, message: str) -> str:
        message = message.lower()
        for key, value in self.knowledge_base.items():
            if key in message:
                return value
        
        return "That's a complex question. While I scan my database, you might want to look at our 'Insurance Denial' module in the Issue Hub or speak with an advocate."

policy_chat = PolicyChatService()
