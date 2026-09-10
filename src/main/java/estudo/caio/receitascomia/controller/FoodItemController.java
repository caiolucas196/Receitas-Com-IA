package estudo.caio.receitascomia.controller;

import estudo.caio.receitascomia.DTO.FoodDTO;
import estudo.caio.receitascomia.model.FoodItem;
import estudo.caio.receitascomia.service.FoodItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@CrossOrigin(origins = "*")
public class FoodItemController {

    // Boa prática: usar 'final' para garantir imutabilidade da injeção
    private final FoodItemService foodItemservice;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemservice = foodItemService;
    }

    @GetMapping("/boasVindas")
    public String boasVindas() { // Padrão Java: nomes de métodos começam com letra minúscula (camelCase)
        return "Bem vindos ao projeto Receitas com IA! :)";
    }

    // --- CRIANDO O CRUD ---

    // ADD ALIMENTOS (CREATE)
    @PostMapping("/adicionar")
    public ResponseEntity<String> adicionarReceita(@RequestBody FoodDTO foodDTO) { // Ideal receber o DTO
        // Chamando através da instância (foodItemservice) e não da classe
        FoodDTO foodCreate = foodItemservice.adicionarReceita(foodDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Alimento adicionado com sucesso: " + foodCreate.toString());
    }

    // MOSTRAR RECEITAS CRIADAS (READ)
    @GetMapping("/listar")
    public ResponseEntity<List<FoodItem>> listarReceitas() {
        return ResponseEntity.status(HttpStatus.OK).body(foodItemservice.listar());
    }

    // MOSTRAR RECEITAS POR ID (READ)
    // TODO: Implementar próximo

    // DELETAR RECEITAS
    // TODO: Implementar próximo
}