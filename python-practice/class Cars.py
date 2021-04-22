import time
import math
import numpy as np
class Cars:
    def __init__(self,name,speed,efficiency,fuel_capacity):
        self.name=name
        self.speed=speed
        self.efficiency=efficiency
        self.fuel_capacity=fuel_capacity
        self.fuel_level=0
        self.curr_speed=0
        self.location=0
        self.start_time=0
        self.total_run=0

    def about(self):
        print('***********************')
        print('ABOUT {self.name}')
        print('-----------------------')
        print('name:',self.name)
        print('speed:',self.speed)
        print('efficiency:',self.efficiency)
        print('fuel_capacity:',self.fuel_capacity)
        print('fuel_level:',self.fuel_level)
        print('current_speed:',self.curr_speed)
        print('location:',self.location)
        print('***********************')

    def fuel_up(self):
        self.fuel_level=self.fuel_capacity
        print(f'{self.name} is fuelled up')

    def update(self):
        if self.start_time==0:
            return
        if(self.fuel_level/self.efficiency<=self.curr_speed*(time.time()/3600-self.start_time)):
            self.location+=self.curr_speed*(time.time()/3600-self.start_time)
            self.total_run+=math.modf(self.curr_speed*(time.time()/3600-self.start_time))
            self.fuel_level=self.fuel_level-math.modf(self.curr_speed*(time.time()/3600-self.start_time))/self.efficiency
        else:
            self.location+=np.sign(self.curr_speed)*self.fuel_level/self.efficiency
            self.curr_speed=0;
            self.fuel_level=0

    def run(self,speed):
        self.update()
        if(self.fuel_level!=0):
            self.start_time=round(time.time()*1000)
            if(speed<=self.speed):
                self.curr_speed=speed
            else:
                return 'The requested speed is beyond the car specification'
        else:
            return 'insufficient fuel'
        

a=Cars('Car A',45,50,500) #(name,speed,efficiency,fuel_capacity)
a.about()
