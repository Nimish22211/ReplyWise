package com.ansh.ReplyWise_Backend.Service;

import com.ansh.ReplyWise_Backend.Model.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatModel chatModel;

    public String getEmailReply(@PathVariable Model message){

        String tone = message.getTone();
        String UserMessage = message.getUserMessage();
        String SystemPrompt = "You are ReplyWise, an AI assistant for drafting quick, polished email replies. The user will paste an email, and you'll return a short and professional response, maintaining the specified tone: "
                + tone +
                ". Focus on clarity, brevity, and ensuring the response aligns with the user's intent, here is the " +
                "email: "
                + UserMessage + ".";

        Prompt prompt = new Prompt(SystemPrompt);

        return chatModel.call(SystemPrompt);
    }
}