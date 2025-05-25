package com.ansh.ReplyWise_Backend.Controllers;

import com.ansh.ReplyWise_Backend.Model.Model;
import com.ansh.ReplyWise_Backend.Service.ChatService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
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
    public ResponseEntity<String> getMessage(@RequestBody Model message){
        return new ResponseEntity<>(service.getEmailReply(message), HttpStatus.OK);
    }
}
