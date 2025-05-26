package com.ansh.ReplyWise_Backend.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @NonNull
    private String UserMessage;

    @NonNull
    private String tone;
}
