package estudo.caio.receitascomia.DTO;

import estudo.caio.receitascomia.enums.Category;
import estudo.caio.receitascomia.enums.UnitOfMeasure;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record FoodDTO(
        Long id,
        @NotBlank(message = "O nome não pode estar vazio") String name,
        Category category,
        @NotNull(message = "A quantidade é obrigatória") Double quantity,
        @NotNull(message = "A unidade de medida é obrigatória") UnitOfMeasure unit,
        LocalDate validade
) {}