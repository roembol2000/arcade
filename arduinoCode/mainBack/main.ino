#include <Keyboard.h>
const byte pins[] =       {2,   4,  7,  8,   12,  18, 19, 20, 21, 22}; //10
const byte leds[] =       {9,   6,  3,  5};
const byte keys[] =       {68,  65, 89, 215, 2,   4,  5,  6,  7,  8};
byte waitingForKeyUp[] =  {0,   0,  0,  0,   0,   0,  0,  0,  0,  0};
int pot = 23;
int sleepDelay = 1000;
unsigned long timeSinceButtonPressed = 0;
int ledstripBrightness = 255;  // 0 - 255;
int buttonLedBrightness = 255; // 0 - 255;

void setup() {
  Serial.begin(115200);
  while (!Serial) { }
  Keyboard.begin();
  for (int i = 0; i < sizeof(pins); i++) {
    pinMode(pins[i], INPUT_PULLUP);
  }
  for (int i = 0; i < sizeof(leds); i++) {
    pinMode(leds[i], OUTPUT);
  }
  pinMode(pot, INPUT);
  Serial.println("started");
}

void loop() {
  for (int i = 0; i < sizeof(pins); i++) {
    if (digitalRead(pins[i]) == LOW) {
      waitingForKeyUp[i] = 1;
      timeSinceButtonPressed = 0;
      if (i < sizeof(leds)) {
        analogWrite(leds[i], buttonLedBrightness);

      }
    } else if (waitingForKeyUp[i] == 1) {
      Serial.println(keys[i]);
      waitingForKeyUp[i] = 0;
      if (i < sizeof(leds)) {
        analogWrite(leds[i], 0);
      }
    }
  }
  timeSinceButtonPressed++;
  if (timeSinceButtonPressed >= sleepDelay) {//fade
    timeSinceButtonPressed = sleepDelay; //to prevent interger overflow
    ledstripBrightness = map(analogRead(pot), 0,1023,0,255);
  }
  delay(1);
}

