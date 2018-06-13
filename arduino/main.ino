//////////////////////////////////////
//Code for using buttons as input   //
//and driving the LEDs              //
//////////////////////////////////////


#include <Keyboard.h>
//Set leds for LED-buttons
int led1 = 3;
int led2 = 5;
int led3 = 6;
int led4 = 9;

//BUTTONS

//Red-led buttons
int knop1 = 2; //A
int knop2 = 4; //B
int knop3 = 7; //C
int knop4 = 8; //D

//Joystick buttons
int knop5 = 8; //Up
int knop6 = 8; //Down
int knop7 = 8; //Right
int knop8 = 8; //Left

//White buttons
int knop9 = 8; //X
int knop10 = 8; //Y


//Variables for fade effect
int idle_timer = 0;
int brightness = 0;
int fadeAmount = 2;

void setup() {
  pinMode(knop1, INPUT_PULLUP);
  pinMode(knop2, INPUT_PULLUP);
  pinMode(knop3, INPUT_PULLUP);
  pinMode(knop4, INPUT_PULLUP);

  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);

  Serial.begin(9600);
    Keyboard.begin();

}

void loop() {

  if (digitalRead(knop1) == LOW) {
    digitalWrite(led1, HIGH);
    idle_timer = 0;
    Keyboard.write('A'); 
  } else {
    digitalWrite(led1, LOW);
  }

  if (digitalRead(knop2) == LOW) {
    digitalWrite(led2, HIGH);
    idle_timer = 0;
    Keyboard.write('B'); 
  } else {
    digitalWrite(led2, LOW);
  }

  if (digitalRead(knop3) == LOW) {
    digitalWrite(led3, HIGH);
    idle_timer = 0;
    Keyboard.write('C'); 
  } else {
    digitalWrite(led3, LOW);
  }

  if (digitalRead(knop4) == LOW) {
    digitalWrite(led4, HIGH);
    idle_timer = 0;
    Keyboard.write('D'); 
  } else {
    digitalWrite(led4, LOW);
  }
  
  delay(50);
  idle_timer = idle_timer + 1;
  while (idle_timer > 100) {
    if ((digitalRead(knop1) == LOW) || (digitalRead(knop2) == LOW) || (digitalRead(knop3) == LOW) || (digitalRead(knop4) == LOW)) {
      idle_timer = 0;
    }
    analogWrite(led1, brightness);
    analogWrite(led2, brightness);
    analogWrite(led3, brightness);
    analogWrite(led4, brightness);

    brightness = brightness + fadeAmount;

    if (brightness >= 150) {
      brightness = 150;
      fadeAmount = -fadeAmount;
    }
    if(brightness <= 0) {
      brightness = 0;
       fadeAmount = -fadeAmount;
      delay(1000);
    }
    delay(50);
  }



  //
  //  digitalWrite(led1, HIGH);
  //  digitalWrite(led2, HIGH);
  //  digitalWrite(led3, HIGH);
  //  digitalWrite(led4, HIGH);

  //  while (!Serial.available()) ;
  //  analogWrite(led2, Serial.parseInt());
  //  while (!Serial.available()) ;
  //  analogWrite(led3, Serial.parseInt());
  //  while (!Serial.available()) ;
  //  analogWrite(led4, Serial.parseInt());
}
