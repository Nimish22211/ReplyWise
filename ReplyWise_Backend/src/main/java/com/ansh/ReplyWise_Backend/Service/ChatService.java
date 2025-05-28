package com.ansh.ReplyWise_Backend.Service;

import com.ansh.ReplyWise_Backend.Exceptions.CustomExeptions.ApiCallException;
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
        String emailSummary = "Summarize the following email into a single, coherent paragraph that captures the key points, tone, and intent without simply repeating the email. " +
                "Ensure the summary is clear, concise, and maintains the original message’s essence." +
                " Avoid listing individual bullet points—integrate all relevant details naturally within the paragraph:" + UserMessage;
        String SystemPrompt = "You are ReplyWise, an AI assistant for drafting quick, polished email replies. The user will paste an email, and you'll return a response, maintaining the specified tone: "
                + tone +
                ". Focus on clarity, brevity, and ensuring the response aligns with the user's intent, and tone specifed, here is the " +
                "email: "
                + UserMessage + ".";

        try {
            return UserResponse.builder()
                    .emailSummary(chatModel.call(emailSummary))
                    .emailResponse(chatModel.call(SystemPrompt))
                    .build();

        }catch (Exception e){
            throw new ApiCallException(e.getMessage());
        }
    }
}