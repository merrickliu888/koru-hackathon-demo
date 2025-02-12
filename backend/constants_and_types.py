from pydantic import BaseModel

class ProcessedImage(BaseModel):
    title: str
    description: str

class ProcessImageResponse(BaseModel):
    processed_images: list[ProcessedImage]

GENERATED_FORM_JSON_SCHEMA = {
    "type": "object",
    "required": [
        "deliverables",
        "morning_routine",
        "period_1",
        "period_2",
        "morning_recess",
        "period_3",
        "period_4",
        "period_5",
        "period_6",
        "afternoon_recess",
        "period_7",
        "period_8",
        "lunch",
        "other_notes"
    ],
    "properties": {
        "deliverables": {
            "type": "array",
            "items": { "type": "string" }
        },
        "morning_routine": { "type": "string" },
        "period_1": { "type": "string" },
        "period_2": { "type": "string" },
        "morning_recess": { "type": "string" },
        "period_3": { "type": "string" },
        "period_4": { "type": "string" },
        "period_5": { "type": "string" },
        "period_6": { "type": "string" },
        "afternoon_recess": { "type": "string" },
        "period_7": { "type": "string" },
        "period_8": { "type": "string" },
        "lunch": { "type": "string" },
        "other_notes": { "type": "string" }
    }
}
