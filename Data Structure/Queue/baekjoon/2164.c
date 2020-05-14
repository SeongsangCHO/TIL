/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   2164.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 18:18:46 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 18:30:21 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

typedef struct s_queue
{
	int	data[1000000];
	int front;
	int rear;
}				t_queue;

t_queue	*init(int N)
{
	t_queue *queue;

	queue = malloc(sizeof(t_queue));
	queue->front = 0;
	queue->rear = N;
	return (queue);
}

void	enQueue(t_queue *queue, int value)
{
	queue->rear++;
	queue->data[queue->rear] = value;
}

int		deQueue(t_queue *queue)
{
	int tmp;
	
	tmp = queue->data[queue->front];
	queue->data[queue->front] = 0;
	queue->front++;
	return (tmp);
}

int main(void)
{
	t_queue *queue;
	int		N;

	scanf("%d",&N);
	queue = init(N);
	for(int i = 0; i < N; i++)
		queue->data[i] = i + 1;
	queue->rear--;
	while(queue->rear - queue->front > 0)
	{
		deQueue(queue);
		enQueue(queue, deQueue(queue));
	}
	printf("%d", queue->data[queue->front]);
	return (0);
}
