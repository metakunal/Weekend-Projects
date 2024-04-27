#ifndef Server_h
#define Server_h

// #include <sys/socket.h> //Not provided by windows
#include <winsock2.h>
// For using unsigned long that is u_long
#include <netinet/in.h>

#pragma comment(lib, "ws2_32.lib")

struct Server
{
    int domain;
    int service;
    int protocol;
    u_long interface;
    int port;
    int backlog;

    struct sockaddr_in address;

    void (*launch)(void); // To launch the server, no parameters as depends upon the user
};

// Function Prototype, defines a function without actually instantiating it
struct Server server_constructor(int domain, int service, int protocol, u_long interface, int port, int backlog, void (*launch)(void));

#endif /* Server_h*/