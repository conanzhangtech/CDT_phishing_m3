# CDT_phishing_m3

THIS RESPOSITORY IS PRIVATE AND IS NOT TO BE SHAED WITH ANYONE OTHER THAN
CYBER YOUTH SINGAPORE AND ITS CURRICULUM DEVELOPMENT TEAM, UNLESS OTHERWISE
STATED.

## PREREQUISITE

#### In this section, I will be explaining what are the required packages bbefore we start the installation.
1. Ubuntu 18.04 and above
> https://ubuntu.com/download/desktop

2. nginx web server package
> apt install nginx

3. git package
> apt install git

## INSTALLATION

#### In this section, I will be explaining how to put the files into your web server and ensure it loads.

1. Clone the git respository into your web server.
> git clone https://github.com/conan97zhang/CDT_phishing_m3.git

2. Move the CDT_phishing_m3 folder into your nginx web server's root directory and rename it into m3.
> mv -r CDT_phishing_m3 /var/www/html/m3

3. Associate the domain name hotspot.wireless with out localhost ip address.
> nano /etc/hosts

3.1 Amend the following line from

>> 127.0.0.1    localhost

TO

>> 127.0.0.1    hotspot.wireless

4. Start nginx web server

> service nginx start

## EXECUTION

#### In this section, I will be explaining how will the frontend (victim's browser) sends the data to the backend (attacker's server) seamlessly.

1. Load the website on your browser.

> http://hostspot.wireless

2. Start capturing the user inputs by opening 2 different terminals.

##### 2.1 Terminal 1
> tail -f /var/log/nginx/access.log | awk '/NRIC/ {print "\n" "Entry " NR " | " $1 $2 $4 $5 " - WIFI HOTSPOT""\n" "\n"  $7}'

##### 2.2 Terminal 2
> tail -f /var/log/nginx/access.log | awk '/REF/ {print "\n" "Entry " NR " | " $1 $2 $4 $5 " - MOF""\n" "\n"  $7}'

3. Go through all the steps in entering the details (VERY SIMPLE!!!)

## SAMPLE OUTPUT (END OF DEMO).

#### In the last section, we will be analysing the sample data output from Terminal 1 and Terminal 2 ( REFER TO EXECUTION(2) )

##### 1. Terminal 1 ( EXECUTION(2)(1) )

The data presented in this output is the input from the rogue Wireless@SG website.

> Entry 4 | 172.32.0.100-[25/Jul/2020:15:14:57+0800] - WIFI HOTSPOT
> 
> /detected.html?title=Title&input=Mr&name=Full+Name&input=John&NRIC=Last+4+digits+of+NRIC&input=345D&postal+code=Postal+Code&input=123456&address=Address&input=123+Tamp+f

From the above data, we can safely deduce the following imformation:
> Title: Mr
>
> Full Name: John
>
> Last 4 digits of NRIC: 345D
>
> Poster Code: 123456
>
> Address: 123 Tamp f

##### 2. Terminal 2 ( EXECUTION(2)(2) )
 
The data presented in this output is the input from the rogue Ministry of Finance website. 
 
> Entry 3 | 172.32.0.100-[25/Jul/2020:15:13:21+0800] - WIFI HOTSPOT
>
> /MOF%20|%20Seek%20Permission%20Form_files/FormFEDYA.html?REF=2020_SPF_MOF&CARD=99999999999999999&CVV=999&EXP=99%2F99

From the above data, we can safely deduce the following imformation:
> Card Number: 99999999999999999
>
> CVV: 999
>
> Exp Date: 99/99

#### NOTE: TO ENSURE THE CORROSPONDING VICTIM FROM TERMINAL 1 AND TERMINAL2 DATA, ALWAYS CHECK THE TIME AND DATE OF INPUT.

##### ====================================================================================================================

# CREDIT AND SUPPORT

#### ZHANG TIANCI CONAN
#### TELEGRAM: https://t.me/conan97zhang
#### INSTAGRAM: https://instagram.com/conan97zhang
