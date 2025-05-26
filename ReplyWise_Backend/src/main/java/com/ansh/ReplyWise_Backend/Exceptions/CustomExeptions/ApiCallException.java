package com.ansh.ReplyWise_Backend.Exceptions.CustomExeptions;

public class ApiCallException extends RuntimeException {
    public ApiCallException(String message) {
        super(message);
    }
}
