package com.ansh.ReplyWise_Backend.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @JsonProperty("UserMessage")
    @NotBlank
    private String UserMessage;

    @NotBlank
    private String tone;
}
