/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   10866.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 20:55:49 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 22:54:30 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 20000

typedef struct s_deque
{
	int front;
	int back;
	int data[MAX_SIZE];
	int size;
	int full_size;
}				t_deque;

t_deque		*init(int N);

void		push_back(t_deque *deque, int value);
void		push_front(t_deque *deque, int value);

int			pop_front(t_deque *deque);
int			pop_back(t_deque *deque);

int			front(t_deque *deque);
int			back_p(t_deque *deque);

int			size(t_deque *deque);
int			empty(t_deque *deque);

t_deque		*init(int N)
{
	t_deque *deque;

	if(!(deque = malloc(sizeof(t_deque))))
		return (NULL);
	deque->size = 0;
	deque->front = 10000;
	deque->back = 9999;
	deque->full_size = 20000;
	return (deque);
}

void		push_back(t_deque *deque, int value)
{
	if(deque == NULL || deque->back + 1 >= deque->full_size)
	{
		printf("-1\n");
		return ;
	}
	deque->back++;
	deque->data[deque->back] = value;
	deque->size++;
	return ;
}

void		push_front(t_deque *deque, int value)
{
	if(deque == NULL || deque->front - 1 <= -1)
	{
		printf("-1\n");
		return ;
	}
	deque->front--;
	deque->data[deque->front] = value;
	deque->size++;
	return ;
}

int			pop_front(t_deque *deque)
{
	if(deque->back - deque->front < 0)
	{
		printf("-1\n");
		return (-1);
	}
	printf("%d\n",deque->data[deque->front]);
	deque->front++;
	deque->size--;
	return (1);
}

int 		pop_back(t_deque *deque)
{	
	if(deque->back - deque->front < 0)
	{
		printf("-1\n");
		return (-1);
	}
	printf("%d\n",deque->data[deque->back]);
	deque->back--;
	deque->size--;
	return (1);
}

int			size(t_deque *deque)
{
	printf("%d\n",deque->size);
	return (deque->size);
}

int			empty(t_deque *deque)
{
	if(deque->size == 0)
	{
		printf("1\n");
		return (0);
	}
	printf("0\n");
	return (1);
}

int			front(t_deque *deque)
{
	if(deque->back - deque->front < 0)
	{
		printf("-1\n");
		return (-1);
	}
	printf("%d\n",deque->data[deque->front]);
	return (1);
}

int			back_p(t_deque *deque)
{
	if(deque->back - deque->front < 0)
	{
		return (-1);
	}
	return (deque->data[deque->back]);
}
int main (void)
{
	t_deque *deque;
	int		N;
	int		tmp;
	int		data;
	char	type[11];

	scanf("%d",&N);
	deque = init(N);
	for(int i = 0; i < N; i++)
	{
		scanf("%s",type);
		if(strcmp(type, "push_back") == 0)
		{	
			scanf("%d",&data);
			push_back(deque, data);
		}
		else if(strcmp(type, "push_front") == 0)
		{
			scanf("%d",&data);
			push_front(deque, data);
		}
		else if(strcmp(type, "pop_front") == 0)
			pop_front(deque);
		else if(strcmp(type, "pop_back") == 0)
			pop_back(deque);
		else if(strcmp(type, "empty") == 0)
			tmp = empty(deque);
		else if(strcmp(type, "front") == 0)
			tmp = front(deque);
		else if(strcmp(type, "back") == 0)
			printf("%d\n",back_p(deque));
		else if(strcmp(type, "size") == 0)
			tmp = size(deque);
	}
	return (0);
}
