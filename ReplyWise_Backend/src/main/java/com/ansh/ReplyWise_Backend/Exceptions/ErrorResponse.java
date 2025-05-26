package com.ansh.ReplyWise_Backend.Exceptions;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    private int status;
    private String errorMessage;
    private LocalDateTime time;
}
