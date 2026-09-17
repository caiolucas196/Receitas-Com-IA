package estudo.caio.receitascomia.dto;

import java.util.List;

public class GerarReceitaRequest {

    private List<IngredienteSelecionadoDto> ingredientes;
    private String instrucaoUsuario;

    // Getters e Setters
    public List<IngredienteSelecionadoDto> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<IngredienteSelecionadoDto> ingredientes) {
        this.ingredientes = ingredientes;
    }

    public String getInstrucaoUsuario() {
        return instrucaoUsuario;
    }

    public void setInstrucaoUsuario(String instrucaoUsuario) {
        this.instrucaoUsuario = instrucaoUsuario;
    }

    public static class IngredienteSelecionadoDto {
        private String nome;
        private Double quantidade;
        private String unidade;

        // Getters e Setters
        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }

        public Double getQuantidade() { return quantidade; }
        public void setQuantidade(Double quantidade) { this.quantidade = quantidade; }

        public String getUnidade() { return unidade; }
        public void setUnidade(String unidade) { this.unidade = unidade; }
    }
}