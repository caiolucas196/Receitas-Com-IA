package estudo.caio.receitascomia.service;

import estudo.caio.receitascomia.dto.FoodDTO;
import estudo.caio.receitascomia.model.FoodItem;
import estudo.caio.receitascomia.repository.FoodItemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodItemService {

    private final FoodItemRepository foodItemRepository;

    public FoodItemService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    // Listar todos
    public List<FoodDTO> listar() {
        return foodItemRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public FoodDTO buscarPorId(Long id) {
        FoodItem item = foodItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item não encontrado com o ID: " + id));
        return toDTO(item);
    }

    // Adicionar (Create)
    public FoodDTO adicionarReceita(FoodDTO dto) {
        FoodItem foodItem = toEntity(dto);
        FoodItem salvo = foodItemRepository.save(foodItem);
        return toDTO(salvo);
    }

    // Atualizar (Update)
    public FoodDTO atualizar(Long id, FoodDTO dto) {
        FoodItem itemExistente = foodItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item não encontrado com o ID: " + id));

        itemExistente.setName(dto.name());
        itemExistente.setCategory(dto.category());
        itemExistente.setQuantity(dto.quantity());
        itemExistente.setValidade(dto.validade());

        FoodItem atualizado = foodItemRepository.save(itemExistente);
        return toDTO(atualizado);
    }

    // Deletar (Delete)
    public void deletar(Long id) {
        if (!foodItemRepository.existsById(id)) {
            throw new EntityNotFoundException("Item não encontrado com o ID: " + id);
        }
        foodItemRepository.deleteById(id);
    }

    // Metodo auxiliar: Entity para DTO
    private FoodDTO toDTO(FoodItem item) {
        return new FoodDTO(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getQuantity(),
                item.getUnit(),
                item.getValidade()
        );
    }

    // Metodo auxiliar: DTO para Entity
    private FoodItem toEntity(FoodDTO dto) {
        FoodItem item = new FoodItem();
        item.setId(dto.id());
        item.setName(dto.name());
        item.setCategory(dto.category());
        item.setQuantity(dto.quantity());
        item.setUnit(dto.unit());
        item.setValidade(dto.validade());
        return item;
    }
}