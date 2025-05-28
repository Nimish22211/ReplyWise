package com.ansh.ReplyWise_Backend.Controllers;

import com.ansh.ReplyWise_Backend.Exceptions.CustomExeptions.ApiCallException;
import com.ansh.ReplyWise_Backend.Response.UserRequest;
import com.ansh.ReplyWise_Backend.Response.UserResponse;
import com.ansh.ReplyWise_Backend.Service.ChatService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/openai")
@RequiredArgsConstructor
@Tag(name = "ChatController")
@CrossOrigin("*")
public class ChatController {

    private final ChatService service;

    @PostMapping
    public ResponseEntity<UserResponse> getMessage(@Valid @RequestBody UserRequest userRequest){

        System.out.println("=== BACKEND DEBUG ===");
        System.out.println("Received UserRequest: " + userRequest);
        System.out.println("UserMessage: " + userRequest.getUserMessage());
        System.out.println("Tone: " + userRequest.getTone());

        try {
            return new ResponseEntity<>(service.getEmailReply(userRequest), HttpStatus.OK);
        }catch (Exception e){
            throw new ApiCallException(e.getMessage());
        }
    }
}
