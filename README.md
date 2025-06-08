# 🗺️ AgroNotes

Aplicativo para coleta e sincronização de anotações georreferenciadas diretamente no campo, criado com **React Native**. Ideal para agrônomos, técnicos agrícolas, pesquisadores e profissionais que precisam marcar pontos específicos no mapa e associar notas personalizadas.

---

### Iniciar o projeto

yarn install

cd ios -> pod install
yarn start
yarn ios ou yarn android

## ✨ Funcionalidades

### 📌 Modo PIN (Manual Mode)

O **Modo PIN** permite que o usuário pause o rastreamento automático da localização e marque manualmente pontos específicos no mapa.

- ✅ **Ativado**: toque em qualquer ponto do mapa para definir a localização da nova anotação.
- 🔄 **Desativado**: o app volta a acompanhar automaticamente a localização atual do dispositivo.

#### 🧠 Comportamento Inteligente:

- Um alerta animado informa visualmente se o modo foi **ativado** ou **desativado**.
- Ao entrar no app pela primeira vez, é exibido um **modal explicativo**, com a opção "Não mostrar novamente".
- Mesmo com o usuário se movendo, o marcador do Modo PIN permanece fixo.

---

### 🗺️ Tela de Mapa

- Visualização de todos os **pontos anotados** com pins diferenciando o status (sincronizado ou não).
- Botão **“Adicionar”** insere nova anotação na posição atual (ou no ponto marcado manualmente).
- Botão **“Sincronizar”** envia todas as anotações pendentes ao backend.

---

### 📝 Tela de Adição

- Campo de texto multilinha com suporte a novas linhas.
- A data e hora atual são preenchidas automaticamente.
- A localização associada depende do Modo PIN (manual ou atual).

---

### ☁️ Sincronização Inteligente

- Salva localmente anotações ainda não sincronizadas.
- Ao sincronizar:
  - Anotações com sucesso são atualizadas com flag `synced = true`.
  - Erros são identificados e destacados com mensagens ao usuário.
- Uso de estratégias de throttle para evitar envios duplicados.

---

### 🔒 Permissões

- Solicita permissão de localização na primeira execução.
- Exibe modal com explicações claras se a permissão for negada.

---

### 💾 Armazenamento Local

- Banco de dados local usando **SQLite**.
- Permite persistência mesmo com o app fechado ou sem internet.

---

## 🧪 Testes Unitários

Utilizamos **Jest** e **React Native Testing Library** para garantir estabilidade e segurança nas principais funcionalidades.

### Cobertura atual de testes:

- ✅ **Função de alternância do Modo PIN** (`onTogglePinMode`)
- ✅ **Exibição condicional do alerta animado** (`<Alert />`)
- ✅ **Persistência local com SQLite**: testes de leitura e escrita
- ✅ **Componente `<PinModeInfoModal />`**
  - Renderização do título, descrição e botão
  - Persistência do flag `hide_pin_mode_info`
- ✅ **Hooks customizados** (`useUserLocation`, `useLocationPermission`)
  - Simulação de mudança de permissões
  - Mock de resposta de geolocalização

### Como executar os testes:

```bash
yarn test
```
