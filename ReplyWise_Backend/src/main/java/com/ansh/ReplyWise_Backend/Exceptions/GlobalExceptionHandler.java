package com.ansh.ReplyWise_Backend.Exceptions;

import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler{

    @EventListener(Exception.class)
    public ErrorResponse generalErrors(Exception e){

        int status = HttpStatus.INTERNAL_SERVER_ERROR.value();

        return new ErrorResponse(status, e.getMessage(), LocalDateTime.now());
    }
}
