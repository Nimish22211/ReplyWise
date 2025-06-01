package com.ansh.ReplyWise_Backend.Service;

import com.ansh.ReplyWise_Backend.Exceptions.CustomExeptions.ApiCallException;
import com.ansh.ReplyWise_Backend.Response.PromptFormat;
import com.ansh.ReplyWise_Backend.Response.UserRequest;
import com.ansh.ReplyWise_Backend.Response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.ansh.ReplyWise_Backend.Response.PromptFormat.getPromptTemplate;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatModel chatModel;
    private final PromptFormat promptTemplate;

    public UserResponse getEmailReply(UserRequest userRequest) {

        String tone = userRequest.getTone();
        String userMessage = userRequest.getUserMessage();

        try {
            BeanOutputConverter<UserResponse> outputConverter = new BeanOutputConverter<>(UserResponse.class);

            PromptTemplate promptTemplate = getPromptTemplate();

            Prompt prompt = promptTemplate.create(Map.of(
                    "tone", tone,
                    "userMessage", userMessage,
                    "format", outputConverter.getFormat()
            ));

            String response = chatModel.call(prompt).getResult().getOutput().getText();

            return outputConverter.convert(response);

        } catch (Exception e) {
            throw new ApiCallException("Failed to generate email response: " + e.getMessage());
        }
    }
}