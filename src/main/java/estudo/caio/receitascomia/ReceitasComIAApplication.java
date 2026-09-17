package estudo.caio.receitascomia;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReceitasComIAApplication {

    public static void main(String[] args) {
        // Carrega o arquivo .env da raiz e injeta como variáveis de sistema
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        SpringApplication.run(ReceitasComIAApplication.class, args);
    }
}