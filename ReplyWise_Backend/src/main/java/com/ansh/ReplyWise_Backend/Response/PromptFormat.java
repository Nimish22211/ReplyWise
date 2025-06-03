package com.ansh.ReplyWise_Backend.Response;

import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Component;

@Component
public class PromptFormat {

    public static PromptTemplate getPromptTemplate() {
        String promptText = """
            You are ReplyWise, an AI assistant for drafting quick, polished email replies.
            
            Analyze the following email and provide:
            
            1. emailSummary: A single, coherent paragraph that captures the key points, tone, and intent of the original email without simply repeating it. Ensure the summary is clear, concise, and maintains the original message's essence. Avoid listing individual bullet points—integrate all relevant details naturally within the paragraph.
            
            2. emailResponse: A polished email reply maintaining the specified tone: {tone}. Focus on clarity, brevity, and ensure the response aligns with the user's intent and specified tone.
            
            Original Email: {userMessage}
            
            {format}
            """;

        return new PromptTemplate(promptText);
    }

}
