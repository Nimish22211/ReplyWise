package com.ansh.ReplyWise_Backend.Response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    @NonNull
    private String emailResponse;
}
