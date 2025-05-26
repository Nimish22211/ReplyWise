package com.ansh.ReplyWise_Backend.Exceptions;

import com.ansh.ReplyWise_Backend.Exceptions.CustomExeptions.ApiCallException;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler{

    @EventListener(ApiCallException.class)
    public ResponseEntity<ErrorResponse> CustomExceptions(RuntimeException e){
        HttpStatus status = HttpStatus.BAD_REQUEST;

        if(e instanceof ApiCallException){
            status = HttpStatus.FORBIDDEN;
        }

        ErrorResponse errorResponse = new ErrorResponse(status.value(), e.getMessage(), LocalDateTime.now());

        return new ResponseEntity<>(errorResponse, status);
    }

    @EventListener(Exception.class)
    public ResponseEntity<ErrorResponse> generalErrors(Exception e){

        int status = HttpStatus.INTERNAL_SERVER_ERROR.value();

        ErrorResponse errorResponse = new ErrorResponse(status, e.getMessage(), LocalDateTime.now());

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
