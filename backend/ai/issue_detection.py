from typing import List, Dict

class IssueDetector:
    def __init__(self):
        # In a real app, this could be a prompt for an LLM
        self.issue_mapping = {
            "Insurance Denials": {
                "tags": ["denial", "coverage", "prior auth"],
                "resources": ["Policy Navigator", "Appeal Templates"]
            },
            "Transportation Issues": {
                "tags": ["ride", "bus", "parking", "geographic barrier"],
                "resources": ["Resource Finder", "Transit Discounts"]
            },
            "Financial Toxicity": {
                "tags": ["cost", "copay", "wages", "financial stress"],
                "resources": ["Financial Wellness Toolkit", "Assistance Programs"]
            }
        }

    def detect_issues(self, intake_data: Dict) -> List[Dict]:
        detected = []
        user_challenges = intake_data.get("challenges", [])
        
        for challenge in user_challenges:
            if challenge in self.issue_mapping:
                detected.append({
                    "issue": challenge,
                    "suggestions": self.issue_mapping[challenge]["resources"],
                    "severity": "High"  # Simplified
                })
        
        # Additional logic based on ZIP code or cancer type can be added here
        return detected

detector = IssueDetector()
