package com.ansh.ReplyWise_Backend.Controllers;

import com.ansh.ReplyWise_Backend.Response.UserRequest;
import com.ansh.ReplyWise_Backend.Response.UserResponse;
import com.ansh.ReplyWise_Backend.Service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/openai")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {

    private final ChatService service;

    @PostMapping
    public ResponseEntity<UserResponse> getMessage(@RequestBody UserRequest userRequest){

        return new ResponseEntity<>(service.getEmailReply(userRequest), HttpStatus.OK);
    }
}
