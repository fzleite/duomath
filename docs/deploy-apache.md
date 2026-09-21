# Deploy no Apache da rede doméstica

O artefato é estático: o conteúdo de `dist/` inteiro, copiado para o `DocumentRoot`. Nada de
backend, banco ou runtime no servidor.

## O ponto que decide o projeto: HTTPS

Service worker e "adicionar à tela inicial" **só funcionam em origem segura**. A única exceção
é `localhost` — que não ajuda, porque o objetivo é abrir do tablet/celular, e aí a origem é
`http://<ip-ou-nome-do-servidor>`, que os navegadores tratam como insegura.

Consequência prática se o app ficar em `http://` puro na LAN: a UI abre e funciona, mas
**não instala, não roda offline e não cacheia nada** — ou seja, deixa de ser um PWA e passa a
ser só um site aberto no navegador.

### Caminho recomendado: certificado local confiável (mkcert)

Mantém tudo dentro da rede doméstica, sem expor nada para a internet.

1. No servidor (a máquina com o Apache):

   ```bash
   # instala a CA local no repositório de confiança da máquina
   mkcert -install
   # emita para o nome E para o IP fixo do servidor, o que for usado no tablet
   mkcert duomath.local 192.168.0.10
   ```

2. Aponte o virtual host HTTPS do Apache para o par `.pem` gerado:

   ```apache
   <VirtualHost *:443>
     ServerName duomath.local
     DocumentRoot "C:/Apache24/htdocs/duomath"
     SSLEngine on
     SSLCertificateFile    "C:/certs/duomath.local+1.pem"
     SSLCertificateKeyFile "C:/certs/duomath.local+1-key.pem"
     <Directory "C:/Apache24/htdocs/duomath">
       AllowOverride All
       Require all granted
     </Directory>
   </VirtualHost>
   ```

   Precisa de `mod_ssl`, `mod_rewrite` e `mod_headers` habilitados — o `.htaccess` que vem no
   `dist/` depende dos dois últimos.

3. Instale o arquivo da CA local (`rootCA.pem`, de `mkcert -CAROOT`) em cada dispositivo:
   - **Android**: Ajustes → Segurança → Credenciais → instalar certificado de CA. O Chrome
     confia em CAs instaladas pelo usuário, então a origem passa a ser segura.
   - **iOS/iPadOS**: instalar o perfil **e** habilitar em Ajustes → Geral → Sobre →
     Confiança em certificados (dois passos separados; só instalar não basta).

4. Se usar nome em vez de IP, garanta a resolução na LAN (entrada no DNS do roteador, ou
   reserva de DHCP + hosts por dispositivo).

### Alternativas, e por que não são o caminho padrão aqui

- **Certificado autoassinado sem CA instalada**: o navegador pede para aceitar o risco e
  segue tratando a origem como insegura — service worker continua bloqueado. Não resolve.
- **Host estático público (Netlify/Cloudflare Pages)**: HTTPS instantâneo e zero configuração,
  mas tira o projeto da rede doméstica. É uma opção válida se em algum momento fizer sentido
  abrir o app fora de casa — os dados continuariam locais a cada dispositivo de qualquer forma.

## Checklist de validação depois de publicar

1. Abrir pelo tablet na URL HTTPS; o cadeado não pode estar com alerta.
2. DevTools → Application → Service Workers: um worker `activated`.
3. Instalar pela tela inicial e abrir em modo standalone (sem barra de endereço).
4. Ligar modo avião e reabrir: app tem que carregar e o progresso continuar lá.
5. Navegar até um exercício, dar F5/refresh: não pode dar 404 (valida o `.htaccess`).
