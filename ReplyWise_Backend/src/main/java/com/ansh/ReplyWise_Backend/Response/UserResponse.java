package com.ansh.ReplyWise_Backend.Response;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    @NotBlank
    private String emailSummary;

    @NotBlank
    private String emailResponse;
}
