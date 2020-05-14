/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   circular_list.h                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 15:21:10 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 19:54:41 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   circular_list.h                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 15:21:08 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 15:21:08 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef CIRCULAR_H
# define CIRCULAR_H
# include <stdlib.h>
# include <stdio.h>

typedef struct		s_node
{
	int				data;
	struct s_node	*next;
	struct s_node 	*prev;
}					t_node;

typedef struct		s_list
{
	t_node 	*tail;
	int		size;
}					t_list;
t_node				*create_node(int data);
void				add_node(t_list *list, int n, int data);
void				print_node(t_list *list);
t_list				*create_list(t_list *list);
int					search_node_data(t_list *list, int data);
void				delete_node(t_list *list, int n);
void				delete_all(t_list *list);
void				edit_node(t_list *list, int n, int data);
#endif
