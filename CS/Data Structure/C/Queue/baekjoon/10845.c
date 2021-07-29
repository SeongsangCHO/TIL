/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   10845.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/27 22:38:21 by secho             #+#    #+#             */
/*   Updated: 2020/04/27 23:23:35 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

# define MAX_SIZE 100000

typedef struct s_queue
{
	int data[MAX_SIZE];
	int back;
	int front;
	int size;
}				t_queue;

t_queue			*init(void)
{
	t_queue *queue;

	if(!(queue = malloc(sizeof(t_queue))))
		return (NULL);
	queue->size = 0;
	queue->front = -1;
	queue->back = -1;
	return (queue);
}

void			enQueue(t_queue *queue, int value)
{
	if(queue == NULL || queue->size < 0 || queue->back + 1 >= MAX_SIZE)
		return ;
	queue->back++;
	queue->data[queue->back] = value;
	queue->size++;
	return ;
}

void			deQueue(t_queue *queue)
{
	if(queue == NULL || queue->size <= 0)
	{
		printf("-1\n");
		return ;
	}
	if(queue->front == -1 && queue->back >= 0)
		queue->front++;
	queue->size--;
	printf("%d\n",queue->data[queue->front]);
	queue->front++;
	return ;
}

void			queue_size(t_queue *queue)
{
	printf("%d\n",queue->size);
	return ;
}

void			isEmpty(t_queue *queue)
{
	if(queue == NULL || queue->size <= 0)
	{
		printf("1\n");
		return ;
	}
	printf("0\n");
}

void			front(t_queue *queue)
{
	if(queue == NULL || queue->size == 0)
	{
		printf("-1\n");
		return ;
	}
	if(queue->front == -1 && queue->back >= 0)
		queue->front++;
	printf("%d\n",queue->data[queue->front]);
}

void			back(t_queue *queue)
{
	if(queue == NULL || queue->size == 0 || queue->back < 0)
	{
		printf("-1\n");
		return ;
	}
	printf("%d\n",queue->data[queue->back]);
}
int main(void)
{
	t_queue *queue;
	char	order[6];
	int		N;
	int		value;

	queue = init();
	scanf("%d",&N);
	for(int i = 0; i < N; i++)
	{
		scanf("%s", order);
		if(order[1] == 'u')
		{
			scanf("%d", &value);
			enQueue(queue, value);
		}
		else if(order[0] == 'f')
		{
			front(queue);
		}
		else if(order[0] == 'b')
		{
			back(queue);
		}
		else if(order[0] == 's')
		{
			queue_size(queue);
		}
		else if(order[0] == 'e')
		{
			isEmpty(queue);
		}
		else if(order[1] == 'o')
			deQueue(queue);
	}
	free(queue);
	return (0);
}
