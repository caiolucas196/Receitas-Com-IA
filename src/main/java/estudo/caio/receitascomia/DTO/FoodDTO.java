package estudo.caio.receitascomia.DTO;

import estudo.caio.receitascomia.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record FoodDTO(
        Long id,
        @NotBlank(message = "O nome não pode estar vazio") String name,
        Category category,
        @NotNull(message = "A quantidade é obrigatória") Integer quantity,
        LocalDate validade
) {}