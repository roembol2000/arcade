static const uint8_t pins[] = {2,3,4,5,6,7,8,9,10,11,12,13,A0,A1,A2,A3,A4}; //17

void setup() {
  Serial.begin(115200);
  while (!Serial) {
  }
  for(int i = 0; i < 17; i++){
    pinMode(pins[i],INPUT);
  }
}

void loop() {
  for(int i = 0; i < 17; i++){
  if(digitalRead(i)) Serial.print(i);
  }
}
