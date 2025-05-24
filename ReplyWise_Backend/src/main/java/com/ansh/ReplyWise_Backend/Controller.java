package com.ansh.ReplyWise_Backend;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/openai")
@RequiredArgsConstructor
@CrossOrigin("*")
public class Controller {

    private final ChatModel chatModel;

    public ResponseEntity<?> getMessage(@PathVariable String message){
        String response = chatModel.call(message);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
