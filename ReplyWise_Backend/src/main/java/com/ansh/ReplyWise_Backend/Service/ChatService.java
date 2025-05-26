package com.ansh.ReplyWise_Backend.Service;

import com.ansh.ReplyWise_Backend.Response.UserRequest;
import com.ansh.ReplyWise_Backend.Response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatModel chatModel;

    public UserResponse getEmailReply(UserRequest userRequest){

        String tone = userRequest.getTone();
        String UserMessage = userRequest.getUserMessage();
        String emailSummary = "Generate an email summary for this:" + UserMessage;
        String SystemPrompt = "You are ReplyWise, an AI assistant for drafting quick, polished email replies. The user will paste an email, and you'll return a short and professional response, maintaining the specified tone: "
                + tone +
                ". Focus on clarity, brevity, and ensuring the response aligns with the user's intent, here is the " +
                "email: "
                + UserMessage + ".";

        return UserResponse.builder()
                .emailSummary(chatModel.call(emailSummary))
                .emailResponse(chatModel.call(SystemPrompt))
                .build();
    }
}