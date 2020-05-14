/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deque.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 18:56:47 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 20:27:56 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef DEQUE_H
# define DEQUE_H

#include <stdio.h>
#include <stdlib.h>

typedef struct s_node
{
	int data;
	struct s_node *prev;
	struct s_node *next;
}				t_node;

typedef struct s_queue
{
	t_node *front;
	t_node *rear;
	int size;
}				t_queue;

t_queue		*init(void);
t_node		*create_node(int data);
void		enQueue(t_queue *queue, int value);
void		enQueue_rear(t_queue *queue, int value);

void		deQueue_rear(t_queue *queue);
void		deQueue(t_queue *queue);
void		print_deque(t_queue *queue);
#endif
