package estudo.caio.receitascomia.model;

import estudo.caio.receitascomia.enums.Category;
import estudo.caio.receitascomia.enums.UnitOfMeasure;
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

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false)
    private Double quantity; // Alterado para Double para aceitar frações (ex: 1.5 kg ou 500 ml)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnitOfMeasure unit; // Nova unidade de medida (QUILOGRAMA, GRAMA, LITRO, MILILITRO, UNIDADE)

    private LocalDate validade;
}