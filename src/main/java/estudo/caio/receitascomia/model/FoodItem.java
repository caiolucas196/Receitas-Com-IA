package estudo.caio.receitascomia.model;

import estudo.caio.receitascomia.enums.Category; // Importando o enum criado
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "food_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING) // Salva o texto da categoria no banco (ex: "GRÃOS") em vez de um número
    private Category category;

    private Integer quantity;

    private LocalDate validade;
}