package com.webshop.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {
    private String firstName;
    private String lastName;
    // We intentionally do not allow updating email here as it usually requires
    // re-verification,
    // and we don't allow updating passwords directly without old-password
    // validation for security.
    // For this assignment, updating name is sufficient for the update profile
    // requirement.
}
