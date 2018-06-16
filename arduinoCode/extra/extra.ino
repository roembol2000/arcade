// Maak 2 plaatsen voor de code
// 1 voor de variable
// 2 voor de void setup en void loop
// en formateer het zoals ik het gedaan heb


//rfid------------------------------------------------{
#include <SPI.h>
#include <MFRC522.h>

constexpr uint8_t RST_PIN = 9;
constexpr uint8_t SS_PIN = 10;

MFRC522 rfid(SS_PIN, RST_PIN); 

MFRC522::MIFARE_Key key;
//rfid------------------------------------------------}

void setup() {
  Serial.begin(115200);
  rfidSetup();
}

void loop() {
  rfidLoop();
}


//rfid------------------------------------------------{
void rfidSetup(){
    SPI.begin();
  rfid.PCD_Init();
}

void rfidLoop(){
  if ( ! rfid.PICC_IsNewCardPresent())
    return;
  if ( ! rfid.PICC_ReadCardSerial())
    return;

  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(rfid.uid.uidByte[i], DEC);
  }
  Serial.println();

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}
//rfid------------------------------------------------}
