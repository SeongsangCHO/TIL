/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   queue.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 08:04:51 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 08:23:29 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef QUEUE_H
# define QUEUE_H

# include <stdio.h>
# include <stdlib.h>
typedef struct s_node
{
	int data;
	struct s_node *next;
}				t_node;
typedef struct s_queue
{
	int size;
	t_node *rear;
	t_node *front;
}				t_queue;
t_queue		*init_queue(void);
t_node		*create_node(int data);
void		enQueue(t_queue *queue, int data);
void	 	deQueue(t_queue *queue);
void		print_queue(t_queue *queue);
#endif
