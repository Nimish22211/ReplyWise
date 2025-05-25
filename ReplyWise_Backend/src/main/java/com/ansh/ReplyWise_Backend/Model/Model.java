package com.ansh.ReplyWise_Backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Model {

    @NonNull
    private String UserMessage;

    @NonNull
    private String tone;
}
